import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useState, useEffect } from 'react'
import { apiCreateDivision } from '../property.service'
import axios from 'axios'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    category: string
    tags: Options
    vendor: string
    brand: string
}

type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        category: string
        tags: Options
        [key: string]: unknown
    }
}

const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]


type PropertyDivision = {
    id: number;
    division_name: string;
    propertyId: number;
  }

  
const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { category: '', tags: [] }, touched, errors } = props
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Options[]>([]);

    // useEffect(() => {
    //     const fetchData = async (values: PropertyDivision) => {
    //         setIsLoading(true);
    //         try {
    //             const divisionsResponse = await apiCreateDivision(values);
    //             setDivisions(divisionsResponse.data); // 'divisionsResponse' now has a type with 'data'
    //             console.log(divisionsResponse)
    //         } catch (error) {
    //             console.error('Error fetching divisions:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    
    //     fetchData();
    // }, [values]);
    
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await axios.get('/users');
                console.log('console fetchdata division', response?.data?.data); // Access data from the response
            } catch (error) {
                console.error('Error fetching data:', error); // Handle errors
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organizations For Category, Types ,Divisions of Property</h5>
            <p className="mb-6">Section to config the property attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Division's"
                        invalid={
                            (errors.category && touched.category) as boolean
                        }
                        errorMessage={errors.category}
                    >
                        <Field name="category">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={values.categories}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Types"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="tags">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={values.tags}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Brand"
                        invalid={(errors.brand && touched.brand) as boolean}
                        errorMessage={errors.brand}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="brand"
                            placeholder="Brand"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Vendor"
                        invalid={(errors.vendor && touched.vendor) as boolean}
                        errorMessage={errors.vendor}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="vendor"
                            placeholder="Vendor"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
