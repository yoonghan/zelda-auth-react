import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useMemo } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

interface DropDownItem {
  key: string
  label: string
}

interface Props {
  id: string
  required: boolean
  label: string
  defaultValue: string
  items: DropDownItem[]
  register?: UseFormRegister<FieldValues>
}

export default function DropDown({
  items,
  label,
  id,
  defaultValue,
  required,
  register,
}: Props) {
  const drawnMenu = useMemo(
    () =>
      items.map(({ key, label }) => (
        <MenuItem value={key} key={key}>
          {label}
        </MenuItem>
      )),
    [items]
  )

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`} required={required}>
        {label}
      </InputLabel>
      <Select
        defaultValue={defaultValue}
        label={label}
        id={id}
        labelId={`${id}-label`}
        {...register(id)}
      >
        {drawnMenu}
      </Select>
    </FormControl>
  )
}
