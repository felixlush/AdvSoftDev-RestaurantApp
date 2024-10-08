import { fetchAllMenuItems, getOrderItemsByID, getPaymentMethodByUserID, getUser, getUserById, getUserSearch } from "..//app/lib/data";
import { User } from "..//app/lib/definitions";

test('get user from database', async () => {
    await expect(getUser('jane.smith@example.com')).resolves.not.toBeNull();
});

test('get user by ID value', () => {
    const user = getUser("1");
    expect(user).not.toBe(null);
})

test('get Order Item by ID', () => {
    const orderItem = getOrderItemsByID("1");
    expect(orderItem).not.toBe(null)
})

test('get user by empty string', async () => {
    let users = await getUserSearch('');
    expect(users.length).toBeGreaterThan(0);

    users = await getUserSearch('felix');
    expect(users.length).not.toBeGreaterThan(2);
});

test('get Payment methods by userID', async () =>{
    let paymentMethods = await getPaymentMethodByUserID('1')
    expect(paymentMethods.length).toBeGreaterThan(0)
})

test('get all menu items', () => {
    const menuItems = fetchAllMenuItems();
    expect(menuItems).not.toBeGreaterThan(0);
})



