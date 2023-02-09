import {useGlobalContext} from '../context'

const Favorites=()=>{
    const {favourites,selectMeal,removeFromFavourites}=useGlobalContext()

    return <section className='favourites'>
        <div className='favourites-content'>
            <h5>Favourites</h5>
            <div className='favourites-container'>
                {favourites.map((item)=>{const{idMeal,strMealThumb:image}=item;
                return <div key={idMeal} className="favourite-item">
                    <img src={image} className="favourites-img img" onClick={()=>selectMeal(idMeal,true)}></img>
                    <button className='remove-btn' onClick={()=>removeFromFavourites(idMeal)}>remove</button> 
                </div>
            })}
            </div>
        </div>
    </section>
}
export default Favorites