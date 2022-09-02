import React from 'react'
import { Button } from '../../components';
import ContactField from '../../types/ContactField';

const ContactFields = (
    { contactFields, setRefresh }: 
    { contactFields: ContactField[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  return (
    <div className="w-full">
        <div className="w-full flex justify-end mb-4">
            <Button mode="secondary" content='Add' />
        </div>
        <div className='w-full overflow-auto'>
            <table className="w-full">
                <tr className="border-y-2 border-secondary-light">
                    <th className='p-3'>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Value
                    </th>
                    <th></th>
                </tr>
                {contactFields?.map((field) => (
                    <tr className='border-b-2'>
                        <td className='text-center p-3'>
                            {field.name}
                        </td>
                        <td className='text-center p-3'>
                            {field.link}
                        </td>
                        <td className='text-center p-3'>
                            {field.value}
                        </td>
                        <td className="flex justify-center items-center">
                            <div className="flex gap-2 mt-2">
                                <Button mode="secondary" content='Edit' />
                                <Button mode="primary" content='Delete' />
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
        
    </div>
  )
}

export default ContactFields;