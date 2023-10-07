interface IFlavoring<FlavorT> {
	_type?: FlavorT;
}
export type Flavor<T, FlavorT> = IFlavoring<FlavorT> & T;
