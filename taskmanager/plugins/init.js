export default async ({ store }) => {
  await store.dispatch('firebase/initialize')
}
