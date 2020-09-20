export default {
  methods: {
    isExternalLink (item) {
      return (item.meta && item.meta.links) ? `externalLink_${item.name}-${item.meta.links}` : item.name
    }
  }
}
