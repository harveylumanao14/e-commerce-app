export function formatMoneyToCents(amount){
    return `$${(amount / 100).toFixed(2)}`
}