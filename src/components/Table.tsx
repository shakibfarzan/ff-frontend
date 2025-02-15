import React from 'react'
import Empty from './Empty';
import Loader from './Loader';

function Table<T>(
    { dataSource, keyIndex, columns }: 
    { dataSource: T[] | undefined; keyIndex: string; columns: Array<{ dataIndex?: string; className?: string; title?: string; render?: (value?: any, record?: T, index?: number) => React.ReactNode}> } 
): React.ReactElement {
  return (
    <div className='w-full overflow-auto'>
        {!dataSource ? <Loader className='flex justify-center mt-28 items-center'/> : 
        <table className="w-full">
            <thead>
                <tr className="border-y-2 border-secondary-light">
                    {columns.map((col, index) => (
                        <th className='p-3' key={col.title ?? index}>
                            {col.title ?? ''}
                        </th>
                    ))}
                </tr>
            </thead>
            {dataSource?.length ? 
                <tbody>
                    {dataSource?.map((data: any, index) => (
                        <tr key={data[keyIndex]} className='border-b-2'>
                            {columns.map(({ className, dataIndex, render }) => (
                                <td className={`p-3 ${className}`}>
                                    {render ? render(dataIndex ? data[dataIndex] : undefined, data, index) : dataIndex ? data[dataIndex] : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>:
                <Empty text='No data found'/>
            }
        </table>
        }
    </div>
  )
}


export default Table;