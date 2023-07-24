import { useContext, useEffect, useState } from 'react'
import './profilePage.css'
import { AuthContext } from '../../contexts/authContext'
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext'
import { toast } from 'react-toastify'

export const ProfilePage = () => {
    const { logOut } = useContext(AuthContext)
    const { addressData, editAddress, addAddress, removeAddress, setMenuState, setIsSearchModalOpen } = useContext(ProductReducerContext);

    const [isAddressVsisible, setIsAddressVsisible] = useState(false)
    const [editOpen, setEditOpen] = useState([]);
    const [addAddressOpen, setAddAddressOpen] = useState(false)
    const [editData, setEditData] = useState({
        name: '',
        phone: '',
        pin: '',
        city: '',
        address: '',
        state: ''
    })
    const [addAddressData, setAddAddressData] = useState({
        name: '',
        phone: '',
        pin: '',
        city: '',
        address: '',
        state: ''
    })

    const editOpenClickHandler = (address) => {
        setEditData(address)
        setEditOpen([...editOpen, address?.id])
    }

    const nameChangeHandler = (event) => {
        setEditData({
            ...editData,
            name: event?.target?.value
        })
    }
    const phoneChangeHandler = (event) => {
        setEditData({
            ...editData,
            phone: event?.target?.value
        })
    }
    const pinCHangeHandler = (event) => {
        setEditData({
            ...editData,
            pin: event?.target?.value
        })
    }
    const cityChangeHandler = (event) => {
        setEditData({
            ...editData,
            city: event?.target?.value
        })
    }
    const addressChangeHandler = (event) => {
        setEditData({
            ...editData,
            address: event?.target?.value
        })
    }
    const stateChangeHandler = (event) => {
        setEditData({
            ...editData,
            state: event?.target?.value
        })
    }

    const nameAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            name: event?.target?.value
        })
    }
    const phoneAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            phone: event?.target?.value
        })
    }
    const pinAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            pin: event?.target?.value
        })
    }
    const cityAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            city: event?.target?.value
        })
    }
    const addressAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            address: event?.target?.value
        })
    }
    const stateAddHandler = (event) => {
        setAddAddressData({
            ...addAddressData,
            state: event?.target?.value
        })
    }

    const editAddressClickHandler = (addressId) => {
        if (editData?.address?.length > 0 && editData?.state?.length > 0 && editData?.city?.length > 0 && editData?.pin?.length > 0 && editData?.phone?.length > 0 && editData?.name?.length > 0) {
            editAddress(addressId, editData)
            setEditOpen(editOpen?.filter((id) => id !== addressId))
        } else {
            toast.warn('All fields are necessary', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    const addAddressClickHandler = () => {
        if (addAddressData?.address?.length > 0 && addAddressData?.state?.length > 0 && addAddressData?.city?.length > 0 && addAddressData?.pin?.length > 0 && addAddressData?.phone?.length > 0 && addAddressData?.name?.length > 0) {
            addAddress(addAddressData)
            setAddAddressOpen(false)
            setAddAddressData({
                name: '',
                phone: '',
                pin: '',
                city: '',
                address: '',
                state: ''
            })
        } else {
            toast.warn('All fields are necessary', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    const openProfileClickHandler = () => {
        setAddAddressOpen(false)
        setIsAddressVsisible(false)
        setEditOpen([])
    }

    useEffect(() => {
        setIsSearchModalOpen(false)
        setMenuState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="profile-page">
            <div className="modal">
                <div className="profile-modal-btn-container">
                    <button className={!isAddressVsisible && 'is-active'} onClick={() => openProfileClickHandler()}>Profile</button>
                    <button className={isAddressVsisible && 'is-active'} onClick={() => setIsAddressVsisible(true)}>Address</button>
                </div>
                {
                    !isAddressVsisible ?
                        <div className="profile-section-container">
                            <div className="profile-section">
                                <p className="user-name">{localStorage.getItem('userName')}</p>
                                <p className="user-email">{localStorage.getItem('userEmail')}</p>
                                <button className="logout" onClick={logOut}>Logout</button>
                            </div>
                        </div>
                        :
                        <div className="address-section">
                            <div className="add-address">
                                {addAddressOpen
                                    ?
                                    <div className="add-address-form">
                                        <input type="text" name="" id="" placeholder='name' className="name-input" onChange={nameAddHandler} />
                                        <input type="number" name="" id="" placeholder='phone' className="phone-input" onChange={phoneAddHandler} />
                                        <input type="number" name="" id="" placeholder='pin-code' className="pincode-input" onChange={pinAddHandler} />
                                        <input type="text" name="" id="" placeholder='city' className="city-input" onChange={cityAddHandler} />
                                        <input type="text" name="" id="" placeholder='state' className="state-input" onChange={stateAddHandler} />
                                        <textarea name="" id="" cols="10" rows="10" placeholder='address' onChange={addressAddHandler}></textarea>
                                        <button className="add-address" onClick={addAddressClickHandler}>Add address</button>
                                        <button className="cancel-add-address" onClick={() => setAddAddressOpen(false)} >Cancel</button>
                                    </div>
                                    :
                                    <div className="open-add-address-div">
                                        <button className="add-address-btn" onClick={() => setAddAddressOpen(true)} >Add Address</button>
                                    </div>
                                }
                                <hr />
                            </div>
                            {addressData?.map((address) => (
                                <div className="address-div" key={address?.id}>
                                    {!editOpen?.includes(address?.id) ?
                                        <div className="address">
                                            <p className="name">{address?.name}</p>
                                            <p className="phone">{address?.phone}</p>
                                            <p className="city">{address?.city}</p>
                                            <p className="pin-code">{address?.pin}</p>
                                            <p className="state">{address?.state}</p>
                                            <p className="address">{address?.address}</p>
                                            <button className="open-edit" onClick={() => editOpenClickHandler(address)} >Edit</button>
                                            <button className="remove-address" onClick={() => removeAddress(address?.id)} >Remove</button>
                                        </div> :
                                        <div className="edit-address">
                                            <input type="text" name="" id="" placeholder='name' className="name-input" defaultValue={address?.name} onChange={nameChangeHandler} />
                                            <input type="number" name="" id="" placeholder='phone' className="phone-input" defaultValue={address?.phone} onChange={phoneChangeHandler} />
                                            <input type="number" name="" id="" placeholder='pin-code' className="pincode-input" defaultValue={address?.pin} onChange={pinCHangeHandler} />
                                            <input type="text" name="" id="" placeholder='city' className="city-input" defaultValue={address?.city} onChange={cityChangeHandler} />
                                            <input type="text" name="" id="" placeholder='state' className="state-input" defaultValue={address?.state} onChange={stateChangeHandler} />
                                            <textarea name="" id="" cols="10" rows="10" placeholder='address' defaultValue={address?.address} onChange={addressChangeHandler}></textarea>
                                            <button className="edit-address" onClick={() => editAddressClickHandler(address?.id)} >Edit</button>
                                            <button className="cancel-edit-address" onClick={() => setEditOpen(editOpen?.filter((id) => id !== address?.id))}>Cancel</button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>}
            </div>
        </div>
    )
}
