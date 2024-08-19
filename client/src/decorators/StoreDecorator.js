const withStore = (storeBinding) => (Target) => {
    const bindingName = Object.keys(storeBinding)[0]
    const storeName = bindingName.replace('use', '').replace(/^\S/, (match) => match.toLowerCase());
    const storeHook = storeBinding[bindingName];

    return class extends Target {
        constructor(props) {
            super(props);
            this.state = { ...this.state, [storeName]: storeHook.getState() }
        }

        componentDidMount() {
            typeof super.componentDidMount === 'function' && super.componentDidMount();
            this[`unsubscribe${storeName}`] = storeHook.subscribe(
                (store) => this.setState({ [storeName]: store })
            );
        }

        componentWillUnmount() {
            typeof super.componentWillUnmount === 'function' && super.componentWillUnmount();
            if (this[`unsubscribe${storeName}`]) this[`unsubscribe${storeName}`]();
        }
    };
};

export default withStore