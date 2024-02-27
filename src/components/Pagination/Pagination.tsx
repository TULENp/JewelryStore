import styles from './Pagination.module.css';

interface PaginationProps {
    dec: () => void;
    inc: () => void;
    page: number;
}

export function Pagination({ dec, inc, page }: PaginationProps) {
    return (
        <div className={styles.container}>
            <button onClick={dec} disabled={page <= 1}>
                {'<'}
            </button>
            <p>{page}</p>
            <button onClick={inc} disabled={page >= 100}>
                {'>'}
            </button>
        </div>
    );
}
