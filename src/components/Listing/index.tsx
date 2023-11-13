import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ReactNode } from 'react'
import AddIcon from '@mui/icons-material/AddCircle'
import RemoveIcon from '@mui/icons-material/RemoveCircle'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

export interface Props<T> {
  addItem: () => void
  removeItem: (item: T, index: number) => void
  items: T[]
  getIndexKey: (item: T) => string | number
  renderItem: (item: T) => ReactNode
}

export default function Listing<T>({
  items,
  addItem,
  removeItem,
  getIndexKey,
  renderItem,
}: Props<T>) {
  const onRemoveClick = (item: T, index: number) => () => {
    removeItem(item, index)
  }

  return (
    <Box>
      <Grid justifyContent={'flex-end'} flex="row" display="flex" gap={2}>
        <Grid item sx={{ mt: 1 }}>
          <Typography>Total: {items.length}</Typography>
        </Grid>
        <Grid item>
          <Button
            component="label"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={addItem}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <List>
        {items.map((item, index) => (
          <ListItem
            key={getIndexKey(item)}
            disableGutters
            secondaryAction={
              <IconButton
                aria-label="remove"
                onClick={onRemoveClick(item, index)}
              >
                <RemoveIcon />
              </IconButton>
            }
          >
            {renderItem(item)}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
