import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api/api"
import { useUserStore } from "../store/useUserStore"

const ItemCard = ({title, description, price, username, status, imageUrl, createdAt, highestBid, bidCount}) => {
    
    return (
        <div className="item-card">
            <img class="item-image" src={imageUrl} />
            <div class="item-content">
                <span class="status-badge status-active">{status}</span>
                <h3 class="item-title">{title}</h3>
                <p class="item-description">{description}</p>
                <div class="item-footer">
                    <div>
                        <div class="item-price">{price}</div>
                        <div class="bid-info">
                            {highestBid}
                            <span class="bid-count">{bidCount}</span>
                        </div>
                    </div>
                    <div class="item-meta">
                        <span class="item-seller">{username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
