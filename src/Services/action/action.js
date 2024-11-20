import axios from "axios";
let url=process.env.REACT_APP_BASE_URL; 

//define action types
export const UPDATE_ITEM="UPDATE_ITEM";
export const CREATE_ROOM_SUCCESS="CREATE_ROOM_SUCCESSS";
export const CREATE_ROOM_ERROR="CREATE_ROOM_ERROR";
export const CREATE_SUCCESS="CREATE_SUCCESS";
export const CREATE_ERROR="CREATE_ERROR";
export const SEND_MESSAGE_REQUEST="SEND_MESSAGE_REQUEST";

export function updateItem(){
    return{
        type:UPDATE_ITEM,
    }
}
export function createRoomSuccess(payload){
    return{
        type: CREATE_ROOM_SUCCESS,
        payload
    }
}

export function createRoomError(error){
    return{
        type:CREATE_ERROR,
        error
    }
}

//all api calls are dispatched on action

export function createRoom(itemNumber){
    return async function(dispatch){
        dispatch(updateItem())
        try {
            const result= await axios.get(`${url}/${itemNumber}`)
            dispatch(createWebSuccess(result.data))
        } catch (error) {
            dispatch(createWebError(error))
        }
    }
}

export const JOIN_ROOM_REQUEST="JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS="JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_ERROR="JOIN_ROOM_ERROR";

export function joinRoomRequest(){
    return{
        type: JOIN_ROOM_REQUEST
    }
}

export function joinRoomSuccess(payload){
    return{
        type: JOIN_ROOM_REQUEST,
        payload
    }
}
export function joinRoomError(error){
    return{
        type: JOIN_ROOM_REQUEST,
        error
    }
}
 export function joinRoom(roomId){
    return async function (dispatch){
        dispatch(joinRoomRequest());
        try {
            const response= await axios.get(`${url}/report`)
            joinRoomSuccess(payload)
        } catch (error) {
            dispatch(joinRoomError(error))
        }
    }
 }
