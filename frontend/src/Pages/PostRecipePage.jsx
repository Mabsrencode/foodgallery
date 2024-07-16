import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import FileBase from "react-file-base64"
import { Link } from 'react-router-dom'
import { useUser } from '../Context/useContext'
import LoadingModal from '../Components/LoadingModal/LoadingModal'
import FetchDataRecipeByParams from '../Middleware/FetchDataRecipeByParams'
const PostRecipePage = () => {
    const user = useUser()
    const [recipeData, setRecipeData] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        instruction: '',
        ingredients: [],
        selectedFile: '',
        category: '',
        country: '',
        youtube: '',
        source: '',
        userId: user?._id,
        userName: user?.user
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchRecipe = useCallback(async () => {
        try {
            setLoading(true);
            const timestamp = Date.now();
            const response = await FetchDataRecipeByParams('/post-recipe/post', {
                userId: user?._id,
                timestamp: timestamp
            });
            setRecipeData(response);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);


    const handleChange = e => {
        if (e.target.name === "ingredients") {
            const ingredientsArray = e.target.value.split('\n').map(requirement => requirement.trim());
            setFormData({ ...formData, ingredients: ingredientsArray });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addIngredients = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
    };

    const removeRequirement = index => {
        const updateIngredients = [...formData.ingredients];
        updateIngredients.splice(index, 1);
        setFormData({ ...formData, ingredients: updateIngredients });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (selectedRecipe) {
            axios.put(`/post-recipe/update-recipe/${selectedRecipe}`, formData)
                .then(() => {
                    setFormData({
                        title: '',
                        instruction: '',
                        ingredients: [],
                        selectedFile: '',
                        category: '',
                        country: '',
                        youtube: '',
                        source: '',
                    });
                    setSelectedRecipe(null);
                    fetchRecipe();
                })
                .catch(error => {
                    console.error('Error updating recipe:', error);
                });
        } else {
            axios.post('/post-recipe/create-recipe', formData)
                .then(() => {
                    setFormData({
                        title: '',
                        instruction: '',
                        ingredients: [],
                        selectedFile: '',
                        category: '',
                        country: '',
                        youtube: '',
                        source: '',
                    });
                    fetchRecipe();
                })
                .catch(error => {
                    console.error('Error adding recipe:', error);
                });
        }
    };

    const handleDelete = id => {
        axios.delete(`/post-recipe/delete-recipe/${id}`)
            .then(() => {
                fetchRecipe();
            })
            .catch(error => {
                console.error('Error deleting recipe:', error);
            });
    };

    const handleEdit = recipe => {
        setSelectedRecipe(recipe._id);
        setFormData({
            title: recipe.title,
            instruction: recipe.instruction,
            ingredients: recipe.ingredients,
            selectedFile: recipe.selectedFile,
            category: recipe.category,
            country: recipe.country,
            youtube: recipe.youtube,
            source: recipe.source,
        });
    };

    return (
        <section className="pt-24 md:pt-[10%]">
            <div className="flex justify-center gap-12 flex-col lg:flex-row container m-auto px-6 md:px-12 lg:px-7">
                <div className='rounded-lg  h-max bg-white p-4 shadow-lg w-full lg:w-1/1 lg:sticky lg:top-[20%]'>
                    <h1 className='text-base md:text-xl text-yellow-900'>Post your recipe</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className="mt-2">
                            <label htmlFor="title" className='font-semibold text-sm'>Title</label>
                            <input
                                id='title'
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                                className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                            />
                        </div>
                        <div className="mt-2 flex gap-2">
                            <div className='w-full'>
                                <label htmlFor="category" className='font-semibold text-sm'>Category</label>
                                <input
                                    id='category'
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="country" className='font-semibold text-sm'>Country</label>
                                <input
                                    id='country'
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="youtube" className='font-semibold text-sm'>Youtube</label>
                            <input
                                id='youtube'
                                type="text"
                                name="youtube"
                                placeholder="Youtube"
                                value={formData.youtube}
                                onChange={handleChange}
                                className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="source" className='font-semibold text-sm'>Source</label>
                            <input
                                id='source'
                                type="text"
                                name="source"
                                placeholder="Source"
                                value={formData.source}
                                onChange={handleChange}
                                className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="instruction" className='font-semibold text-sm'>Instruction</label>
                            <textarea placeholder='Instructions' className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5' value={formData.instruction} onChange={handleChange} name="instruction" id="instruction" cols="30" rows="5"></textarea>
                        </div>
                        <div className="flex flex-col mt-2 gap-2">
                            {formData.ingredients.map((requirement, index) => (
                                <div key={index} className="">
                                    <div className="flex gap-2">
                                        <input placeholder='ingredients'
                                            type="text"
                                            value={requirement}
                                            onChange={e => {
                                                const updateIngredients = [...formData.ingredients];
                                                updateIngredients[index] = e.target.value;
                                                setFormData({ ...formData, ingredients: updateIngredients });
                                            }}
                                            className='bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="px-6 py-2 bg-yellow-300 text-yellow-900 font-semibold text-sm rounded-full"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <p className='font-semibold text-sm'>Upload Image</p>
                            <FileBase multiple={false} value={formData.selectedFile} name='selectedFile' type="file" onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
                        </div>
                        <div className="flex flex-col w-full">
                            <button type="button" onClick={addIngredients} className="mt-4 text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-6 md:mx-auto w-full">Add Ingredients</button>
                            <button type="submit" className='mt-4  text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-[20px] md:mx-auto w-full'>{selectedRecipe ? 'Update Post' : 'Post'}</button>
                        </div>
                    </form>
                </div>
                <div className='h-full w-full'>
                    {loading ? (<LoadingModal />) : (
                        recipeData?.length > 0 ? recipeData?.map((recipe) => (
                            <div key={recipe._id} className='bg-yellow-100 rounded-lg mb-6 shadow-lg'>
                                <div className="container flex flex-col-reverse gap-6 px-6 py-6 mx-auto lg:h-[42rem]">
                                    <div className="">
                                        <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                                            {recipe.title}
                                        </h1>
                                        <ul className="mt-8 space-y-5">
                                            <li className="flex items-center -mx-2 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>

                                                <p className="mx-2">{recipe.country}</p>
                                            </li>

                                            <li className="flex items-center -mx-2 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>

                                                <p className="mx-2">{recipe.category}</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        {recipe.youtube && <Link to={`${recipe.youtube}`} className='text-xs md:text-base hover:bg-yellow-200 block mb-4 bg-yellow-300 px-2 md:px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                            Watch on Youtube how to make this recipe.
                                        </Link>}
                                        {recipe.source && <Link to={recipe.source} className='text-xs md:text-base hover:bg-yellow-200 block truncate mb-4 bg-yellow-300 px-2 md:px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                            Source
                                        </Link>}
                                    </div>
                                    <div className="flex items-center justify-center w-full h-96 overflow-hidden rounded-lg ">
                                        <img className="object-cover w-full h-[300px] sm:h-full mx-auto rounded-md lg:max-w-2xl" src={recipe.selectedFile} alt="glasses " />
                                    </div>
                                </div>
                                <div className='container flex flex-col-reverse gap-12 px-6 py-10 mx-auto '>
                                    <div className='w-full lg:w-1/2'>
                                        <h1 className='text-xl text-yellow-900 font-bold'>INSTRUCTIONS</h1>
                                        <p className='text-justify text-gray-700 mt-6'>{recipe.instruction}</p>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-xl text-yellow-900 font-bold'>INGREDIENTS</h1>
                                        <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 grid-rows gap-4'>
                                            {recipe.ingredients?.map((instruction, index) => (
                                                <li key={index} className='mt-3'>
                                                    <strong className="font-bold text-yellow-900">{index + 1}.</strong> {instruction}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='flex gap-4 px-6 pb-6'>
                                    <button className='mt-4 text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-6 md:mx-auto w-full' onClick={() => handleEdit(recipe)}>Edit</button>
                                    <button className='mt-4 text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-6 md:mx-auto w-full' onClick={() => handleDelete(recipe._id)}>Delete</button>
                                </div>
                            </div>
                        )) : <><div><h1 className='font-bold text-4xl text-yellow-900'>No Recipe Posted.</h1></div></>
                    )
                    }
                </div>
            </div>
        </section>
    )
}

export default PostRecipePage