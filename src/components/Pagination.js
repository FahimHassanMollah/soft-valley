import React from 'react';

export default function Pagination({ links,setPage }) {
    const changePageHandler = (link) => {
        
        setPage(link.url.toString().split('?page=')[1]);
    }
    return (
        links.length > 1 && (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    {
                        links.map((link, key) => (
                            <div key={key}>
                                <li  className={link.active ? 'page-item active' : 'page-item'}>
                                    <button onClick={()=> changePageHandler(link)} className="page-link" disabled={link.url === null}>
                                        {
                                            key === 0 && <span>Previous</span>
                                        }
                                        {
                                            key !== 0 && key !== (links.length - 1) && <span>{link.label}</span>
                                        }
                                        {
                                            key === (links.length - 1) && <span>Next</span>
                                        }
                                    </button>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </nav>
        )
    );
}
