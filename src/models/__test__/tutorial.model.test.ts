import Tutorial from '../tutorial.model'

test('Affected rows should be greater than 0 if successfully insert tutorial data to the database', async () => {
  const validData = {
    title: 'Test Insert',
    description: 'This todo item is inserted by test script',
    published: false,
  }

  const tutorial = new Tutorial()
  const result = await tutorial.create(validData)
  expect(result.affectedRows).toBeGreaterThan(0)
})

test("Should return error if inserted data fields doesn't match tutorial table fields", async () => {
  const invalidData = {
    title: 'Test Insert',
    description: 'This todo item is inserted by test script',
    published: false,
    invalidField: 'This is invalid field',
  }

  try {
    const tutorial = new Tutorial()
    const result = await tutorial.create(invalidData)
  } catch (e) {
    expect(e).toBe("Error! Inserted fields doesn't match table fields")
  }
})
