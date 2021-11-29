import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

import { withFormik } from '../../enhancers/withFormik'
import { RadioE, RadioEProps } from '.'
import { FormikGroupE } from '../FormikGroup'

export default {
  component: RadioE,
  title: 'Radio (Experimental)',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta

const Template: Story<RadioEProps> = (props) => <RadioE {...props} />

export const Default = Template.bind({})
Default.args = {
  id: undefined,
  label: 'Default radio',
  name: 'default',
  defaultChecked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  id: undefined,
  isDisabled: true,
  label: 'Disabled radio',
  name: 'disabled',
}

export const Invalid = Template.bind({})
Invalid.args = {
  id: undefined,
  label: 'Invalid radio',
  name: 'invalid',
  isInvalid: true,
}

export const WithFormikGroup: Story<RadioEProps> = () => {
  const RadioForm = () => {
    interface Data {
      [key: string]: string
    }

    const initialValues: Data = {
      example: '',
      exampleWithError: '',
    }

    const initialTouched = {
      exampleWithError: true,
    }

    const validationSchema = yup.object().shape({
      exampleWithError: yup.string().required(),
    })

    const FormikRadio = withFormik(RadioE)

    return (
      <Formik
        initialValues={initialValues}
        initialTouched={initialTouched}
        validateOnMount
        onSubmit={action('onSubmit')}
        validationSchema={validationSchema}
      >
        <Form>
          <FormikGroupE label="Select an option">
            <Field
              component={FormikRadio}
              name="example"
              label="Option 1"
              value="Option 1"
            />
            <Field
              component={FormikRadio}
              name="example"
              label="Option 2"
              value="Option 2"
            />
            <Field
              component={FormikRadio}
              name="example"
              label="Option 3"
              value="Option 3"
            />
          </FormikGroupE>
          <br />
          <FormikGroupE label="Select another option">
            <Field
              component={FormikRadio}
              name="exampleWithError"
              label="Another option 1"
              value="Another option 1"
            />
            <Field
              component={FormikRadio}
              name="exampleWithError"
              label="Another option 2"
              value="Another option 2"
            />
            <Field
              component={FormikRadio}
              name="exampleWithError"
              label="Another option 3"
              value="3"
            />
          </FormikGroupE>
        </Form>
      </Formik>
    )
  }

  return <RadioForm />
}

WithFormikGroup.storyName = 'Formik Group'
