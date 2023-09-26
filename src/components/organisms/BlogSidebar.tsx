import React from 'react'
import LatestArticle from '../molecule/LatestArticle'
import Button from '../buttons/Button'

function BlogSidebar() {
  const latestArticles = [
    {
      title:
        'The most interesting historical monuments in Jaipur The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
    },
    {
      title: 'The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
    },
    {
      title: 'The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
    },
  ]
  const relatedTours = [
    {
      title:
        'The most interesting historical monuments in Jaipur The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
      tourDetails: {
        days: 8,
        countries: 3,
        price: {
          initial_price: 1000,
          discounted_price: 800,
          currency_symbol: '$',
        },
      },
    },
    {
      title: 'The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
      tourDetails: {
        days: 8,
        countries: 3,
        price: {
          initial_price: 1000,
          discounted_price: 800,
          currency_symbol: '$',
        },
      },
    },
    {
      title: 'The most interesting historical monuments in Jaipur',
      link: '/',
      image:
        'https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60',
      tourDetails: {
        days: 8,
        countries: 3,
        price: {
          initial_price: 1000,
          discounted_price: 800,
          currency_symbol: '$',
        },
      },
    },
  ]
  const tags = ['India', 'Jaipur', 'Rajasthan', 'Monuments']
  return (
    <div className="bg-primary w-[350px] px-3 py-10 rounded-md">
      {/* Search */}
      <h4 className="font-semibold text-xl">Search articles</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <input type="text" placeholder="Search" className="w-full my-2 rounded-2xl px-3 py-2" />
      <hr className="my-5 opacity-40 text-gray" />
      {/* Latest Articles */}
      <h4 className="font-semibold text-xl">Latest articles</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <div className="flex flex-col gap-3 py-5">
        {latestArticles.map((article, index) => {
          return <LatestArticle {...article} key={index} />
        })}
      </div>
      <hr className="my-5 opacity-40 text-gray" />
      {/* Related Tours */}
      <h4 className="font-semibold text-xl">Related Tours</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <div className="flex flex-col gap-3 py-5">
        {relatedTours.map((article, index) => {
          return <LatestArticle {...article} key={index} />
        })}
      </div>
      <hr className="my-5 opacity-40 text-gray" />
      {/* Own tour */}
      <h4 className="font-semibold text-xl">Want to create your own tour</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <Button text="Tailor your tour" className="my-5 py-3" />
      <hr className="my-5 opacity-40 text-gray" />
      {/* Tagd */}
      <h4 className="font-semibold text-xl">Tags</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <div className="flex flex-wrap gap-2 py-5">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="rounded-md border border-darkblue border-opacity-10 bg-white p-2 text-gray font-medium"
            >
              {tag}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogSidebar
