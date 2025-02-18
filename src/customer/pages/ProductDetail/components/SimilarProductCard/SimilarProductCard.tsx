import React from 'react'

const SimilarProductCard = () => {
  return (
    <div className="group px-4 relative ">
      <div
        className="card"
      >
       <img src="https://th.bing.com/th/id/R.f9a07c538142c31549ea886e25bb11fc?rik=EA87rks89vx5Jg&pid=ImgRaw&r=0" alt="" />
        

       
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>Niky</h1>
          <p>Blue Shirt</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">rs 400</span>
          <span className="thin-line-though text-gray-400">999</span>
          <span className="text-[var(--primary-color)]">30%</span>
        </div>
      </div>
    </div>
  )
}

export default SimilarProductCard