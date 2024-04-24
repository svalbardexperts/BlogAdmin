import React, { useRef, useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineUpload } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import '../../Css/AddStory.css'

const AddCategory = () => {

    const { config } = useContext(AuthContext)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const clearInputs = () => {
        setCategory('')
        setDescription('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            category,
            description
        }
        try {
            const { data } = await axios.post("/story/addcategory",payload , config)
            setSuccess('Add blog successfully ')

            clearInputs()
            setTimeout(() => {
                setSuccess('')
            }, 7000)

        }
        catch (error) {
            setTimeout(() => {
                setError('')

            }, 7000)
            setError(error.response.data.error)

        }

    }
    return (

        <div className="Inclusive-addStory-page ">
            <Link to={'/'} >
                <FiArrowLeft />
            </Link>
            <form onSubmit={handleSubmit} className="addStory-form">

                {error && <div className="error_msg">{error}</div>}
                {success && <div className="success_msg">
                    <span>
                        {success}
                    </span>
                    <Link to="/">Go home</Link>
                </div>}
                <h5>Add Category</h5>
                <input
                    type="text"
                    required
                    id="title"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                <h5>Description</h5>
                <input
                    type="text"
                    required
                    id="title"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <button type='submit' className={category.length>0 ? 'addStory-btn' : 'dis-btn'}
                >Publish Category </button>
            </form>
        </div>

    )
}

export default AddCategory


