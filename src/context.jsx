import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import App from './App';

const AppContext=React.createContext();

const allMealsUrl='https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomUrl='https://www.themealdb.com/api/json/v1/1/random.php'



const AppProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const [meals,setMeals]=useState([])
    const [searchTerm,setSearchTerm]=useState('')
    const [showModal,setShowModal]=useState(false )
    const [selectedMeal,setSelectedMeal]=useState(null)
    const [favourites,setFavourites]=useState([])

    const fetchMeals=async(url)=>{
        setLoading(true);
        try{
            const {data}=await axios(url) // const{data} the curly braces while declaring var is called object destructing --- https://stackoverflow.com/questions/49292324/curly-braces-declaring-a-variable-in-react
            if(data.meals){
                setMeals(data.meals)
            }
            else{
                setMeals([])
            }
        }
        catch(error){
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchRandomMeal=()=>{
        fetchMeals(randomUrl)
    }

    const closeModal=()=>{
        setShowModal(false)
    }

    const addToFavourites=(idMeal)=>{
        console.log("Fav")
        const meal=meals.find((meal)=>meal.idMeal===idMeal)
        const alreadyFavourite=favourites.find((meal)=>meal.idMeal===idMeal)
        if(alreadyFavourite) return
        const updatedFavourites=[...favourites,meal];
        setFavourites(updatedFavourites)
        
    }

    const removeFromFavourites=(idMeal)=>{
        const updatedFavourites=favourites.filter((meal)=>meal.idMeal!==idMeal)
        setFavourites(updatedFavourites)
       
    }

    const selectMeal=(idMeal,favouriteMeal)=>{
        let meal;
        if(favouriteMeal){
            meal=favourites.find((meal)=>meal.idMeal===idMeal)
        }        
        meal=meals.find((meal)=>meal.idMeal===idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }

    useEffect(()=>{
        fetchMeals(allMealsUrl)
    },[])

    useEffect(()=>{
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    },[searchTerm])  

    return <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,
    selectMeal,closeModal,addToFavourites,removeFromFavourites,favourites}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider}