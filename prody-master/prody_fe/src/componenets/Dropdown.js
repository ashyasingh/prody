import React, {useState, useRef, useEffect} from 'react';

import './Dropdown.css'
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';
import {useHistory} from "react-router";

const Dropdown = (props) => {

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState('');
    const [itemDisplay, setItemDisplay] = useState('');
    const [filter, setFilter] = useState('');

    // console.log(`Dropdown ${props}`);

    const wrapperRef = useRef(null);

    useEffect(()=>{
        setItemDisplay(props.defultValue);
    },[props.defultValue]);

    const dropdown = () => {
        if (open) {
            return (
                <div className='dropdown_list' ref={wrapperRef}>
                <input
                    className='dropdown_filter'
                    placeholder='Filter'
                    onChange={changeFilterHandler}
                    value={filter}/>
                {open && <div>{list()}</div>}
            </div>
            )
        }
    };

    const list = () => {
        if (props.loading) {return <div className='dropdown_item'>Loading...</div>}
        else if (!props.loading && !props.listArray.length) {return (<div className='dropdown_item'>No results</div>)}
        else {
            return props.listArray.map((item, index) => {
                return <div className='dropdown_item'
                            key={index}
                            onClick={() => clickItemHandler(item.value, item.displayValue)}
                            tabIndex='0'>
                    {item.displayValue}</div>
            })
        }
    };

    /*
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {document.removeEventListener('mousedown', handleClickOutside)}
    },[]);

    const handleClickOutside = (event) => {
        const {current: wrap} = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setOpen(false)
        }
    };

     */


    const clickItemHandler = (itemValue, itemDisplayValue) => {
        setItem(itemValue);
        props.selectionValueHandler(itemValue);
        if (props.useDisplayValue) {props.selectionDisplayValueHandler(itemDisplayValue);}
        if (props.updateURL) {props.updateURL(itemValue)}
        setOpen(false);
    };

    const changeFilterHandler = (event) => {
        setFilter(event.target.value);
        props.filterHandler(event.target.value);
    };


    return (
        <div className="dropdown_container">
            <div className='dropdown_title'>{props.title}</div>
            <div
                className="dropdown_header"
                onClick={() => setOpen(!open)}>
                <div>{itemDisplay}</div>
                <div className={open ? 'dorpdown_header_icon_open' : ''}><ArrowIcon/></div>
            </div>
            {dropdown()}
        </div>
    )
};

export default Dropdown;

// TODO: close on click outside