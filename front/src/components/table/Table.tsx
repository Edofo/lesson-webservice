import { useEffect, useState } from "react";

import "./Table.scss";

interface ITable {
    heads: string[];
    children: any;
    pagination?: boolean;
}

const Table = ({ heads, children, pagination }: ITable) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [items, setItems] = useState(children.slice(0, rowsPerPage));

    const handleChangePage = (newPage: number) => {
        const itemsLength = children.length;
        const maxPage = Math.ceil(itemsLength / rowsPerPage);

        if (newPage < 0 || newPage > maxPage) return;

        setPage(newPage);
        setItems(children.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(parseInt(event.target.value));
    };

    useEffect(() => {
        handleChangePage(0);
    }, [rowsPerPage]);

    return (
        <table className="Table Shadow">
            <thead>
                <tr>
                    {heads?.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{items}</tbody>
            {pagination && (
                <tfoot
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <tr>
                        <td colSpan={heads.length}>
                            <div>
                                <label htmlFor="rows-per-page">Rows per page:</label>
                                <select id="rows-per-page" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={heads.length}>
                            <div>
                                <button onClick={() => handleChangePage(page - 1)}>Previous</button>
                                <button onClick={() => handleChangePage(page + 1)}>Next</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
};

export default Table;
