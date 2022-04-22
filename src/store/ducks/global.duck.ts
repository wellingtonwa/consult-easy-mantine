import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {jhiAuthenticationToken} from "../../util/auth.util";

export interface GlobalState {
    data: any | null;
}

export const globalSlice = createSlice<GlobalState, SliceCaseReducers<GlobalState>>({
                                                                                        name: 'global',
                                                                                        initialState: {
                                                                                            data: null,
                                                                                        },
                                                                                        reducers: {
                                                                                            setData: (state:any, action:any) => {
                                                                                                sessionStorage.setItem(jhiAuthenticationToken, action.payload);
                                                                                                state.data = action.payload;
                                                                                            }
                                                                                        }
                                                                                    });

export const {setData} = globalSlice.actions;
export default globalSlice.reducer;