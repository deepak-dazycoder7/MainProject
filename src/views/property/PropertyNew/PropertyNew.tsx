import PropertyForm, {
    FormModel,
    SetSubmitting,
} from '@/views/property/PropertyForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateProperty } from '../property.service'

const PropertyNew = () => {
    const navigate = useNavigate()

    const addProperty = async (data: FormModel) => {
        const response = await apiCreateProperty<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addProperty(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Property successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/sales/product-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    return (
        <>
            <PropertyForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default PropertyNew
