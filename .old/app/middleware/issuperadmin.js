export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth) {
    console.log(`you're not logged in`)
    return redirect('/login')
  }
  if (store.state.auth.role !== 'superadmin') {
    console.log(`you're not an admin`)
    return redirect('/')
  }
}
