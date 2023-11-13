import { render, within } from '@testing-library/react'
import DropDown from '.'
import { useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

describe('Dropdown', () => {
  const Wrapper = () => {
    const { register } = useForm()

    return (
      <>
        <DropDown
          items={[
            { key: '1', label: 'One' },
            { key: '2', label: 'Two' },
          ]}
          id="counter"
          label="Counter"
          defaultValue="1"
          register={register}
          required={true}
        />

        <DropDown
          items={[
            { key: '3', label: 'Three' },
            { key: '4', label: 'Four' },
          ]}
          id="Counter2"
          label="Counter2"
          defaultValue="3"
          register={register}
          required={true}
        />
      </>
    )
  }

  it('should render dropdown and can do a selection on first dropdown', async () => {
    const { getByLabelText, findByRole, getByRole } = render(<Wrapper />)
    await userEvent.click(getByLabelText('Counter *'))
    await userEvent.click(
      await within(await findByRole('listbox', { name: 'Counter' })).findByRole(
        'option',
        {
          name: 'Two',
        }
      )
    )
    expect(getByRole('button', { name: 'Counter Two' })).toBeInTheDocument()
  })

  it('should render dropdown and can do a selection second dropdown', async () => {
    const { getByLabelText, findByRole, getByRole } = render(<Wrapper />)
    await userEvent.click(getByLabelText('Counter2 *'))
    await userEvent.click(
      await within(
        await findByRole('listbox', { name: 'Counter2' })
      ).findByRole('option', {
        name: 'Three',
      })
    )
    expect(getByRole('button', { name: 'Counter2 Three' })).toBeInTheDocument()
  })
})
