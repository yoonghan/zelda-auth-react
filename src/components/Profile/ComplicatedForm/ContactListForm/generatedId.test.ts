import { generateId } from './generateId'

describe('generatedId', () => {
  it('should generate id with -{id}', () => {
    const idGen = generateId('999')
    expect(idGen).toBe('-999')
  })

  it('should generate id if prefix is given', () => {
    const idGen = generateId('99', 'newid')
    expect(idGen).toBe('newid-99')
  })
})
