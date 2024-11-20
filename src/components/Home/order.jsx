import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';
import uuid from 'uuid-random';
import Card from './Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Info from './Info';
import { UserContext } from '../Context';
import { useContext } from "react";

const Order = () => {
    const [list, setList] = useState([]);
    const [info, setInfo] = useState({});
    const [outletName, setOutletName] = useState("")
    const [show, setShow] = useState(true)
    const [id, setId] = useState("")
    const [hash, setHash] = useState("");
    const [token, setToken] = useState("");
    const [socket, setSocket] = useState(null)
    const roomIdRef = useRef(id)
    const outletRef = useRef(outletName)
    const outRef = useRef(outletName)
    const hashRef = useRef(hash)
    const listRef = useRef(list)
    // const tokenRef = useRef(token)
    const [outlet, setOutlet] = useState([]);



    const { setUserName } = useContext(UserContext);


    let url = process.env.REACT_APP_SOCKET_URL
    let baseUrl = process.env.REACT_APP_BASE_URL
    let navigate = useNavigate();

    useEffect(() => {
        console.log("inside token check")
        console.log(token)
        let tokenCheck = localStorage.getItem("token");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("token"))
        }
        localStorage.removeItem('outlet')
    }, [])

    useEffect(() => {
        // tokenRef.current = token
        console.log(token)
        if (token) {
            axios.post(`${baseUrl}/outlets`, {
                token: `${token}`
            })
                .then((response) => {
                    console.log('to get outlet name', response)
                    setOutlet(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [token])



    useEffect(() => {
        if (!socket) {
            console.log("here")
            var newSocket = io(`${url}`, {
                transports: ['websocket'],
                upgrade: false,
                cors: {
                    origin: "*"
                },
                forceNode: true,
            })
            newSocket.on('connect', () => {
                console.log(newSocket)
                setSocket(newSocket)
            });

        }
        return () => newSocket.close();
    }, [])


    useEffect(() => {
        let uid = uuid();
        setId(uid)
    }, [])

    useEffect(() => {
        listRef.current = list;
        outletRef.current = outletName
        if (!token || !outletName) {
            return
        }
        axios.post(`${baseUrl}/stats`, {
            outlet: `${outletName}`,
            token: `${token}`
        })
            .then((response) => {
                console.log("info", response)
                setInfo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        // let len = list.length
        // if (len != 0) {
        //     console.log("list", list)

        // }
        // else {
        //     console.log("okay")
        // }

    }, [list, token, outletName])

    const updateList = (data) => {
        console.log(data, "inside update list");
        setList(current => [...data]);
    }
    useEffect(() => {
        if (socket?.connected) {
            socket.on('message', (msg) => {
                socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
                let received_hash = msg.update_endpoint || ""
                setHash(received_hash)
                hashRef.current = received_hash
            })
            socket.on('disconnect', () => {
                console.log('Disconnected');
                socket.removeAllListeners();
                window.location.reload();
            });
        }
    }, [socket])

    useEffect(() => {
        if (socket?.connected) {
            socket.on('get_live_error', (msg) => {
                setShow(false)
            })
            socket.on(hashRef.current, (msg) => {
                let list_items = listRef.current;
                if (!msg) {
                    return;
                }
                setShow(true)
                let new_list = [msg, ...list_items]
                updateList(new_list)
            })
            let errorArray = ["quantity_error", "itemresponse_error", "itemvoid_error", "orderseen_error", "tablevoid_error"]
            errorArray.map(e => {
                socket.on(`${hashRef.current}${e}`, (error) => {
                })
            })
            socket.on(`${hashRef.current}table_response`, (res) => {
                let list_items = listRef.current;
                let newList = list_items.filter(el => el.table_id !== res.table_id)
                updateList(newList);
            })
            socket.on(`${hashRef.current}orderseen_response`, (res) => {
                console.log(res)
            })
            socket.on(`${hashRef.current}tablevoid_response`, (res) => {
                console.log(res)
            })
            socket.on(`${hashRef.current}item_response`, (res) => {
                console.log(res)
                socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
                let itemCount = res.item_count;
                console.log(itemCount)
                if (itemCount === 0) {
                    console.log("R4EMOVE THIS TABLE FROM FRONTEND")
                    socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
                    setList(current => []);
                }
            })

            socket.on(`${hashRef.current}itemvoid_response`, (res) => {
                socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
                let itemCount = res.item_count;
                console.log(itemCount)
                if (itemCount === 0) {
                    console.log("R4EMOVE THIS TABLE FROM FRONTEND")
                    socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
                    setList(current => []);
                }
            })
            socket.on(`${hashRef.current}quantity_response`, (res) => {
                let list_items = listRef.current;
                const listIndex = list_items.map(i => i.table_id).indexOf(res.table_id);
                let arr_index;
                listIndex < 0 ? arr_index = list_items.length - listIndex : arr_index = listIndex;
                let clickedList = list_items[arr_index];
                let index = Object.keys(clickedList["OrderItemDetailsList"]).findIndex(key => clickedList["OrderItemDetailsList"][key].item_id === res.item_id);
                let newlist = list_items;
                newlist[arr_index].OrderItemDetailsList[index].Quantity = res.quantity;
                updateList(newlist);
            })
            socket.on(`${hashRef.current}orderseen_response`, (res) => {
                // console.log("res of orderseen_response", res.table_id)
                // let listItems = listRef.current;
                // console.log(listItems, "list Items")
                // let TableId = res.table_id;
                // const listIndex = listItems.map(i => i.table_id).indexOf(TableId);
                // let currentList = listItems[listIndex]
                // console.log("selected list", currentList)
                socket.emit("get_live", { roomId: `${roomIdRef.current}`, outlet_name: `${outletRef.current}`, token: `${token}` })
            })
            socket.on('initial_load', (res) => {
                console.log(res, "initial load")
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
            socket.on("error", (error) => {
                console.log("error")
                console.log(error)
            })
        }
    }, [hash])

    const handleChange = (event) => {
        setOutletName(event)
    }

    const handleEnter = (name) => {
        console.log(name)
        setOutletName(name)
        localStorage.setItem("outlet", name)
        outletRef.current = name
        socket.emit('join', {
            userName: `${name}`,
            roomCode: `${id}`,
            token: `${token}`
        })
    }


    const handleCompleted = (item) => {
        socket.emit("table_done", {
            roomId: `${id}`,
            table_id: `${item}`,
            hash: `${hash}`,
            token: `${token}`
        })
    }

    const handleFinished = (item) => {
        console.log("inside handle finished", item);
        socket.emit("item_complete", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`,
            token: `${token}`
        })
    }
    const handleCancel = (item) => {
        console.log('inside handle cancel/void')
        socket.emit("item_void", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`,
            token: `${token}`
        })
    }
    const handleMinus = (item) => {
        console.log("inside handle minus")
        socket.emit("quantity_decrease", {
            roomId: `${id}`,
            item_id: `${item}`,
            hash: `${hash}`,
            token: `${token}`
        })
    }
    const handleCookProcess = (tableId) => {
        socket.emit("order_seen", {
            roomId: `${id}`,
            table_id: `${tableId}`,
            hash: `${hash}`,
            token: `${token}`
        })
    }

    return (
        <div className="container">
            <div className="row">
                <Search handleEnter={handleEnter} handleChange={handleChange} outlet={outlet} />
                {!show && <><div>Error! Please check the outlet name.</div></>}
                <Info info={info} />
                {show && list.map((element, index) => (
                    <Card element={element} handleFinished={handleFinished} handleCookProcess={handleCookProcess} handleCompleted={handleCompleted} handleMinus={handleMinus} handleCancel={handleCancel} index={index} />
                ))}
            </div>
        </div>

    )
}
export default Order