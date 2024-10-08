import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useState, useEffect, useRef } from 'react'
import { apiGetAllCategory, apiGetAllDivision, apiGetAllSubCategory, apiGetAllType, apiPostDivision } from '../property.service'
import { Category, Type, Division, SubCategory } from '../property.type'
import { Accordion } from 'flowbite-react'

type Option = {
    label: string
    value: string
}[]

type FormFieldsName = {
    division: string
    type: string
    category: string
    sub_category: string
    multipleCheckbox: Array<string | number>
    options: Option

}

type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        division: string
        type: string
        category: string
        sub_category: string
        multipleCheckbox: Array<string | number>
        options: Option
        [key: string]: unknown
    }
}


const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { division: [], type: [], category: [], multipleCheckbox: [] }, touched, errors } = props

    const [divisions, setDivisions] = useState<Division[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const divisionResponse = await apiGetAllDivision({});
                setDivisions(divisionResponse.data);

                const categoryResponse = await apiGetAllCategory({});
                setCategories(categoryResponse.data);

                const typeResponse = await apiGetAllType({});
                setTypes(typeResponse.data)

                const subCategoryResponse = await apiGetAllSubCategory({});
                setSubCategories(subCategoryResponse.data)

                setError(null);
            } catch (error) {
                setError("Failed to fetch data");
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const currentRequestIdRef = useRef<number>(0);

    const saveSelectedOptions = async (selectedOptions: Option) => {
        const requestId = ++currentRequestIdRef.current;

        const formattedOptions = selectedOptions.map(option => ({
            division_name: option.label,
            division_id: option.value,
        }));

        try {
            const response = await apiPostDivision<any, { selectedOptions: Option[] }>({ selectedOptions: formattedOptions });

            if (requestId === currentRequestIdRef.current) {
                console.log('Options saved successfully:', response);
            } else {
                console.log('Ignored response for request ID:', requestId);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessages = error.response.data.message;
                if (Array.isArray(errorMessages)) {
                    const divisionError = errorMessages.find(err => err.field === 'division_name');
                    if (divisionError) {
                        setApiError(divisionError.message);
                    }
                }
            } else {
                setApiError("An unexpected error occurred");
            }
            console.error('Error saving selected options:', error);
        }
    };



    return (

        <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title><h6>Organizations For Category, Types ,Divisions of Property</h6>
                </Accordion.Title>
                <Accordion.Content>
                    <AdaptableCard divider isLastChild className="mb-4">
                        {apiError && <div className="text-red-500">{apiError}</div>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormItem
                                    label="Division's"
                                    invalid={
                                        (errors.division && touched.division) as boolean
                                    }
                                    errorMessage={errors.division}
                                >
                                    <Field name="division">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                isMulti
                                                componentAs={CreatableSelect}
                                                field={field}
                                                form={form}
                                                options={divisions.map(division => ({
                                                    label: division.division_name,
                                                    value: division.id
                                                }))}
                                                value={values.division}
                                                onChange={(selectedOptions: options) => {
                                                    form.setFieldValue(field.name, selectedOptions);
                                                    saveSelectedOptions(selectedOptions);
                                                }}


                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                            <div className="col-span-1">
                                <FormItem
                                    label="Types"
                                    invalid={
                                        (errors.type && touched.type) as unknown as boolean
                                    }
                                    errorMessage={errors.type as string}
                                >
                                    <Field name="type">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                componentAs={CreatableSelect}
                                                field={field}
                                                form={form}
                                                options={types.map(type => ({
                                                    label: type.type_name,
                                                    value: type.id
                                                }))}
                                                value={values.type}
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
                                    label="Categories"
                                    invalid={(errors.category && touched.category) as boolean}
                                    errorMessage={errors.category}
                                >
                                    <Field name="category">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                isMulti
                                                componentAs={CreatableSelect}
                                                field={field}
                                                form={form}
                                                options={categories.map(category => ({
                                                    label: category.category_name,
                                                    value: category.id
                                                }))}
                                                value={values.category}
                                                onChange={(option) =>
                                                    form.setFieldValue(field.name, option)
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                            <div className="col-span-2">
                                <FormItem
                                    asterisk
                                    label="Sub-Category Multiple Checkbox"
                                    invalid={Boolean(errors.multipleCheckbox && touched.multipleCheckbox)}
                                    errorMessage={errors.multipleCheckbox as string}
                                >
                                    <Field name="multipleCheckbox">
                                        {({ field, form }: FieldProps) => (
                                            <Checkbox.Group
                                                value={values.multipleCheckbox}
                                                onChange={(options: string[]) =>
                                                    form.setFieldValue(field.name, options)
                                                }
                                            >
                                                {subcategories.map((category) => (
                                                    <Checkbox color="green-500"
                                                        key={category.id}
                                                        name={field.name}
                                                        value={category.sub_category_name}
                                                    >
                                                        {category.sub_category_name}
                                                    </Checkbox>
                                                ))}
                                            </Checkbox.Group>
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                        </div>
                    </AdaptableCard>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>


    )
}

export default OrganizationFields
