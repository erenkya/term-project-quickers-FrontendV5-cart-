import React from 'react'
import { useParams } from 'react-router-dom'

export default function SearchProduct() {
    let {searchWord} = useParams();
  return (
    <div>Searched value is: {searchWord}</div>
  )
}
