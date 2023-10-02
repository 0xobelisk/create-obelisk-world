module counter::counter_comp {
    use std::ascii::{String, string};
    use std::option::none;
    use std::vector;
    use sui::bcs;
    use sui::tx_context::TxContext;
    use sui::table::{Self, Table};
    use sui::table_vec::{Self, TableVec};
    use counter::entity_key;
    use counter::world::{Self, World};
  
    // Systems
	friend counter::counter_system;

	const NAME: vector<u8> = b"counter";

	// value
	struct CompMetadata has store {
		id: address,
		name: String,
		types: vector<String>,
		entity_key_to_index: Table<address, u64>,
		entities: TableVec<address>,
		data: Table<address, vector<u8>>
	}

	public fun new(ctx: &mut TxContext): CompMetadata {
		let _obelisk_component = CompMetadata {
			id: id(),
			name: name(),
			types: types(),
			entity_key_to_index: table::new<address, u64>(ctx),
			entities: table_vec::empty<address>(ctx),
			data: table::new<address, vector<u8>>(ctx)
		};
		table::add(&mut _obelisk_component.data, id(), encode(0));
		_obelisk_component
	}

	public fun id(): address {
		entity_key::from_bytes(NAME)
	}

	public fun name(): String {
		string(NAME)
	}

	public fun types(): vector<String> {
		vector[string(b"u64")]
	}

	public fun entities(world: &World): &TableVec<address> {
		let _obelisk_component = world::get_comp<CompMetadata>(world, id());
		&_obelisk_component.entities
	}

	public fun entity_length(world: &World): u64 {
		let _obelisk_component = world::get_comp<CompMetadata>(world, id());
		table_vec::length(&_obelisk_component.entities)
	}

	public fun data(world: &World): &Table<address, vector<u8>> {
		let _obelisk_component = world::get_comp<CompMetadata>(world, id());
		&_obelisk_component.data
	}

	public fun register(world: &mut World, ctx: &mut TxContext) {
		world::add_comp<CompMetadata>(world, NAME, new(ctx));
		world::emit_register_event(NAME, types());
	}

	public(friend) fun update(world: &mut World, value: u64) {
		let _obelisk_component = world::get_mut_comp<CompMetadata>(world, id());
		let _obelisk_data = encode(value);
		*table::borrow_mut<address, vector<u8>>(&mut _obelisk_component.data, id()) = _obelisk_data;
		world::emit_update_event(id(), none(), _obelisk_data)
	}

	public fun get(world: &World): u64 {
		let _obelisk_component = world::get_comp<CompMetadata>(world, id());
		let _obelisk_data = table::borrow<address, vector<u8>>(&_obelisk_component.data, id());
		decode(*_obelisk_data)
	}

	public fun encode(value: u64): vector<u8> {
		let _obelisk_data = vector::empty<u8>();
		vector::append(&mut _obelisk_data, bcs::to_bytes(&value));
		_obelisk_data
	}

	public fun decode(bytes: vector<u8>): u64 {
		let _obelisk_data = bcs::new(bytes);
		(
			bcs::peel_u64(&mut _obelisk_data)
		)
	}
}
