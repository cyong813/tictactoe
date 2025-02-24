import Link from 'next/link'

export default function Page() {
    return (
        <div>
            TicTacToe
            <button>
                <Link href='/rooms'>Enter</Link>
            </button>
        </div>
    )
}