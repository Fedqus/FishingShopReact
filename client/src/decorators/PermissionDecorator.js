const withPermission = (permittedRole, fallbackComponent) => (Target) => {
    return class extends Target {
        render() {
            if (!this.state?.authStore) {
                throw new Error(`Target component must include AuthStore. Please connect AuthStore using withAuthStore.`);
            }
            if (this.state.authStore.isValid() && this.state.authStore.user.roles.includes(permittedRole)) {
                return super.render()
            }
            return fallbackComponent
        }
    };
};

export { withPermission }