import ItemCard from '../components/ItemCard'
import { useEffect, useState } from "react"
import { useItemStore } from "../store/useItemStore"
import { useUserStore } from "../store/useUserStore"
import { api } from "../api/api"

const ItemsList = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {items, getItems} = useItemStore()
    const [stats, setStats] = useState(undefined)
    useEffect(() => {
        const load = async () => {
            setError(null)
            setIsLoading(true)
            try {
                await getItems()
            } catch (error) {
                console.error(error)
                setError(error.item)
            } finally {
                setIsLoading(false)
            }
        }
        load()

        const loadStats = async () => {
            try {
                const res = await api.getStats()
                setStats(res.data)
            } catch (error) {
                console.error(error)
            }

        }
        loadStats()
    }, [])

    return (
        <div className="container">
            <div class="page-header">
                <h1>Все товары</h1>
            </div>
            {stats && (
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalItems}</span>
                    <span class="stat-label">Товаров</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalBids}</span>
                    <span class="stat-label">Ставок</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.activeItems}</span>
                    <span class="stat-label">Активных</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.averageItemPrice}₽</span>
                    <span class="stat-label">Средняя цена</span>
                </div>
            </div>
            )}

            <div class="items-grid">
                    {items.map((item, i) => (
                        <ItemCard key={i} {...item} />
                    ))}
            </div>
        </div>
    )
}

export default ItemsList
