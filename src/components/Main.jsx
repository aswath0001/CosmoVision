export default function main(props){
  const {data}=props
    return (
      <div className="imageContainer">
          <img src = {data?.hdurl} alt={data.title || 'bg-img'}className="bgImage"/>
      </div>
    )
        
        
    
}