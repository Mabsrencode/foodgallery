import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FileBase from "react-file-base64"
const PostRecipePage = () => {
    const [recipeData, setRecipeData] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        instruction: '',
        ingredients: [],
        selectedFile: '',
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        try {
            const response = (await axios.get('http://localhost:4000/post-recipe/all-recipes'))
            setRecipeData(response.data);
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleChange = e => {
        if (e.target.name === "ingredients") {
            // Split the input value by newline characters and trim whitespace
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
            axios.put(`http://localhost:4000/post-recipe/update-recipe/${selectedRecipe}`, formData)
                .then(() => {
                    setFormData({
                        title: '',
                        instruction: '',
                        ingredients: [],
                        selectedFile: '',
                    });
                    setSelectedRecipe(null);
                    fetchRecipe();
                })
                .catch(error => {
                    console.error('Error updating recipe:', error);
                });
        } else {
            axios.post('http://localhost:4000/post-recipe/create-recipe', formData)
                .then(() => {
                    setFormData({
                        title: '',
                        instruction: '',
                        ingredients: [],
                        selectedFile: '',
                    });
                    fetchRecipe();
                })
                .catch(error => {
                    console.error('Error adding recipe:', error);
                });
        }
    };

    const handleDelete = id => {
        axios.delete(`http://localhost:4000/post-recipe/delete-recipe/${id}`)
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
        });
    };

    return (
        <section className="max-w-[100rem] py-[6%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-12 flex-col lg:flex-row">
                <div className='rounded-lg  h-max bg-secondary-white p-4 shadow-lg w-full lg:w-1/3'>
                    <h1>Post your recipe</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                id='title'
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                                className='block w-full px-5 py-2.5 mt-2 placeholder-gray-400 bg-white border border-neutral-gray-light rounded-lg dark:placeholder-gray-600 focus:ring-primary-light focus:outline-none focus:ring'
                            />
                        </div>
                        <div>
                            <label htmlFor="instruction">Instruction</label>
                            <textarea className='block w-full px-5 py-2.5 mt-2 placeholder-gray-400 bg-white border border-neutral-gray-light rounded-lg dark:placeholder-gray-600 focus:ring-primary-light focus:outline-none focus:ring' value={formData.instruction} onChange={handleChange} name="instruction" id="instruction" cols="30" rows="10"></textarea>
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
                                            className='block w-full px-5 py-2.5 placeholder-gray-400 bg-white border border-neutral-gray-light rounded-lg dark:placeholder-gray-600 focus:ring-primary-light focus:outline-none focus:ring'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="px-3 py-2 bg-yellow-300 text-yellow-900 font-semibold rounded-full"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <FileBase multiple={false} name='selectedFile' type="file" onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
                        <div className="flex gap-4">
                            <button type="button" onClick={addIngredients} className="mt-4 text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-[20px] md:mx-auto">Add Requirement</button>
                            <button type="submit" className='mt-4  text-yellow-900 font-semibold rounded-full transition-all hover:bg-yellow-200 py-2 bg-yellow-300 px-[20px] md:mx-auto'>{selectedRecipe ? 'Update Job Offer' : 'Add Job Offer'}</button>
                        </div>
                    </form>
                </div>
                <div className='h-full w-full'>
                    <ul className={`flex flex-wrap gap-8 justify-center ${recipeData.length > 0 && "overflow-y-scroll"} max-h-[430px] w-full bg-secondary-white p-4 rounded-lg shadow-lg`}>
                        {recipeData.length > 0 ? (
                            recipeData.map(recipe => (
                                <li className='border border-neutral-gray-light w-[400px] bg-white p-6 rounded-xl h-max' key={recipe._id}>
                                    <h2 className='text-[26px] font-bold'>
                                        {recipe.title}
                                    </h2>
                                    <ul className='mb-6 text-neutral-gray'>
                                        {recipe.ingredients.map((requirement, index) => (
                                            <li key={index} className='mt-4 flex gap-4'><i className="fa-solid fa-circle-check text-[20px] text-primary-dark"></i>{requirement}</li>
                                        ))}
                                    </ul>
                                    <div className='flex gap-4'>
                                        <button className='text-secondary-white rounded-full transition-all hover:opacity-75 py-2 bg-primary-dark px-[30px]' onClick={() => handleEdit(recipe)}>Edit</button>
                                        <button className='text-secondary-white rounded-full transition-all hover:opacity-75 py-2 bg-red px-[30px]' onClick={() => handleDelete(recipe._id)}>Delete</button>
                                    </div>
                                </li>
                            ))
                        ) : <div><h1 className='font-bold'>No Recipe Posted.</h1></div>}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default PostRecipePage