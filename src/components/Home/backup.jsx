import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faSearch, faMinus, faCutlery } from '@fortawesome/free-solid-svg-icons'
// import Calculation from './Calculation';
// import ConvertTime from './convertTime';
import io from 'socket.io-client';
import uuid from 'uuid-random';
import Card from './Card';

const Order = () => {
    const [list, setList] = useState([]);
    const [outletName, setOutletName] = useState("")
    const [show, setShow] = useState(true)
    const [id, setId] = useState("")
    const [hash, setHash] = useState("");
    const list_ref = useRef(list)

    var socket = io("ws://192.168.101.15:5000", {
        transports: ['websocket'],
        upgrade: false,
        cors: {
            origin: "*"
        },
        forceNode: true,
    })
    useEffect(() => {
        let uid = uuid();
        setId(uid)
    }, [])
    useEffect(() => {
        list_ref.current = list;
    }, [list])
    const handleEnter = () => {
        socket.emit('join', {
            userName: `${outletName}`,
            roomCode: `${id}`
        })
    }

    socket.on('get_live_error', (msg) => {
        setShow(false)
    })
    socket.on('message', (msg) => {
        socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}` })
        let received_hash = msg.update_endpoint || ""
        setHash(received_hash)
    })
    const updateList = (data) => {
        // console.log(data, "inside update list");
        setList(current => [...data]);
    }
    useEffect(() => {
        socket.on(hash, (msg) => {
            let list_items = list_ref.current;
            // console.log(msg)
            if (!msg) {
                return;
            }
            setShow(true)
            let new_list = [msg, ...list_items]
            updateList(new_list)
        })
        let errorArray = ["quantity_error", "itemresponse_error", "itemvoid_error", "orderseen_error", "tablevoid_error"]
        errorArray.map(e => {
            socket.on(`${hash}${e}`, (error) => {
                // console.log(error)
            })
        })

        socket.on(`${hash}itemvoid_response`, (res) => {
            console.log(res)
            socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}` })
            // let list_items = list_ref.current;
            // const listIndex = list_items.map(e => e.table_id).indexOf(res.table_id);
            // let data = list_items[listIndex];
            // console.log("data of void ", data )
            // let tempList = list_items;
            // let currentItem=res.item_id;
            // console.log("temp list of void response",tempList)
            // let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === currentItem)
            // console.log("index of void response", index)
            // tempList[listIndex]["OrderItemDetailsList"].splice(index, 1)
            // updateList(tempList)
        })

        socket.on(`${hash}table_response`, (res) => {
            let list_items = list_ref.current;
            let newList = list_items.filter(el => el.table_id !== res.table_id)
            updateList(newList);
        })
        socket.on(`${hash}orderseen_response`, (res) => {
            console.log(res)
        })
        socket.on(`${hash}tablevoid_response`, (res) => {
            console.log(res)
        })
        socket.on(`${hash}item_response`, (res) => {
            console.log(res)
            let list_items = list_ref.current;
            const listIndex = list_items.map(e => e.table_id).indexOf(res.primary_key);
            let arr_index;
            listIndex < 0 ? arr_index = list_items.length - listIndex : arr_index = listIndex;
            let data = list_items[arr_index];
            let tempList = list_items;
            let toFind = res.item_id;
            let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === toFind);
            tempList[arr_index]["OrderItemDetailsList"].splice(index, 1);
            updateList(tempList);
            let itemCount = res.item_count;
            console.log(itemCount)
            if (itemCount === 0) {
                console.log("R4EMOVE THIS TABLE FROM FRONTEND")
                socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}` })
            }

        })
        socket.on(`${hash}quantity_response`, (res) => {
            let list_items = list_ref.current;
            const listIndex = list_items.map(i => i.table_id).indexOf(res.table_id);
            let arr_index;
            listIndex < 0 ? arr_index = list_items.length - listIndex : arr_index = listIndex;
            let clickedList = list_items[arr_index];
            let index = Object.keys(clickedList["OrderItemDetailsList"]).findIndex(key => clickedList["OrderItemDetailsList"][key].item_id === res.item_id);
            let newlist = list_items;
            newlist[arr_index].OrderItemDetailsList[index].Quantity = res.quantity;
            updateList(newlist);
        })
        socket.on(`${hash}orderseen_response`, (res) => {
            console.log("res of orderseen_response", res.table_id)
            let listItems = list_ref.current;
            console.log(listItems, "list Items")
            let TableId = res.table_id;
            const listIndex = listItems.map(i => i.table_id).indexOf(TableId);
            let currentList = listItems[listIndex]
            console.log("selected list", currentList)

            // const listIndex = list_items.map(e => e.table_id).indexOf(res.table_id);
            // let data = list_items[listIndex];
            // console.log("data of void ", data )

            // let tempList = list_items;
            // let currentItem=res.item_id;
            // console.log("temp list of void response",tempList)
            // let index = Object.keys(data["OrderItemDetailsList"]).findIndex(key => data["OrderItemDetailsList"][key].item_id === currentItem)
            // console.log("index of void response", index)
            // tempList[listIndex]["OrderItemDetailsList"].splice(index, 1)
            // updateList(tempList)


            socket.emit("get_live", { roomId: `${id}`, outlet_name: `${outletName}` })
        })
    }, [hash])

    socket.on('initial_load', (res) => {
        setShow(true)
        if (!res) {
            setShow(false)
            updateList([])
            return;
        }
        let { data } = JSON.parse(res)
        console.log("=>", data)
        setList(data)
    })

    const handleChange = (event) => {
        setOutletName(event.target.value)
    }
    const handleCompleted = (item) => {
        console.log("inside completed")
        console.log(item)
        socket.emit("table_done", {
            roomId: `${id}`,
            table_id: `${item}`,
            hash: `${hash}`
        })
    }
    socket.on("error", (error) => {
        console.log(error)
    })

    const handleFinished = (item) => {
        console.log("inside handle finished", item);
        socket.emit("item_complete", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }
    const handleCancel = (item) => {
        console.log('inside handle cancel/void')
        socket.emit("item_void", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }

    const handleMinus = (item) => {
        console.log("inside handle minus")
        socket.emit("quantity_decrease", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`
        })
    }
    const handleCookProcess = (tableId) => {
        socket.emit("order_seen", {
            roomId: `${id}`,
            table_id: `${tableId}`,
            hash: `${hash}`
        })
    }
    return (
        <div className="row">
            <div className='center-input-outlet'>
                <input
                    type="text"
                    placeholder="Outlet Name"
                    onChange={handleChange}
                    className="input-enter" />
                <button type="sumbit" className="btn-enter-icon" onClick={handleEnter}>
                    <span><FontAwesomeIcon icon={faSearch} /></span>
                </button>
            </div>
            {!show && <><div>Error! Please check the outlet name.</div></>}
            {show && list.map((element, index) => (
                // <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                //     <div className='ticket'>
                //         <div className='item-order-type'>
                //             <div className='top-icon'>
                //                 <FontAwesomeIcon
                //                     icon={faCheck}
                //                     className="check-icon"
                //                     onClick={() => handleCompleted(element.table_id)} />
                //             </div>
                //             <p className='item-type'>{element.orderType}</p>
                //         </div>
                //         <div className='item-course-detail'>
                //             <div className='item-detail'>
                //                 <div className='time-guests'>
                //                     <ConvertTime timeOrder={element.orderTime} />
                //                     <p>Guests :<span>2</span>
                //                     </p>
                //                 </div>
                //                 <h1>{element.tableNum}</h1>
                //                 <p>{element.employee}</p>
                //                 <Calculation Ordertime={element.orderTime} />
                //             </div>
                //             {element
                //                 .OrderItemDetailsList
                //                 .map((item, index) => (
                //                     <div className='course-item' key={index}>
                //                         <p className='course-type'></p>
                //                         <div className='item-list'>
                //                             <div className='item-name'>
                //                                 <p className='quantity-box'>
                //                                     <span>{item.Quantity}</span></p>
                //                                 <p >{item.ItemName}</p>
                //                                 <div className='item-check-process'>
                //                                     <div onClick={() => handleFinished(item.item_id)}>
                //                                         <FontAwesomeIcon icon={faCheck} className="completed-icon" />
                //                                     </div>
                //                                     {(item.Quantity > 1) ?
                //                                         <div onClick={() => handleMinus(item.item_id)}>
                //                                             <FontAwesomeIcon icon={faMinus} className="minus-icon" />
                //                                         </div>
                //                                         :
                //                                         <div onClick={() => handleCancel(item.item_id)}>
                //                                             <FontAwesomeIcon icon={faTimes} className="delete-icon" />
                //                                         </div>
                //                                     }
                //                                 </div>
                //                             </div>
                //                             {(item.Modifications === '')
                //                                 ? ""
                //                                 : <p className='modifications'>-{item.Modifications}</p>
                //                             }
                //                         </div>
                //                     </div>
                //                 ))}
                //             {(element.currentState === "Started") ?
                //                 <button className='seen-btn' type='submit' onClick={() => handleCookProcess(element.table_id)}>
                //                     SEEN
                //                 </button>
                //                 :
                //                 <button className='start-cooking' type='submit' onClick={() => handleCookProcess(element.table_id)}>
                //                     <FontAwesomeIcon icon={faCutlery} />
                //                 </button>
                //             }
                //         </div>
                //     </div>
                // </div>
                <Card element={element} handleFinished={handleFinished} handleCookProcess={handleCookProcess} handleCompleted={handleCompleted} handleMinus={handleMinus} handleCancel={handleCancel} index={index} />
            ))}
        </div>
    )
}
export default Order