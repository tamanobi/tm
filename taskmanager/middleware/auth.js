import '~/plugins/init'

export default async function ({ store }) {
  const { dispatch } = store
  await dispatch('auth/log')
}
