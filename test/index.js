import React, { render, createClass, createElement, Component, PropTypes } from '../src';

/*global sinon,expect*/

describe('preact-compat', () => {
	describe('render()', () => {
		it('should be exported', () => {
			expect(React)
				.to.have.property('render')
				.that.is.a('function')
				.that.equals(render);
		});
	});

	describe('createClass()', () => {
		it('should be exported', () => {
			expect(React)
				.to.have.property('createClass')
				.that.is.a('function')
				.that.equals(createClass);
		});

		it('should create a Component', () => {
			let specState = { something: 1 };
			let spec = {
				foo: 'bar',
				getInitialState() {
					return specState;
				},
				method: sinon.spy()
			};
			const C = createClass(spec);
			let inst = new C();
			expect(inst).to.have.property('foo', 'bar');
			expect(inst).to.have.property('state', specState);
			expect(inst).to.have.property('method').that.is.a('function');
			expect(inst).to.be.an.instanceof(Component);
			inst.method('a','b');
			expect(spec.method)
				.to.have.been.calledOnce
				.and.calledOn(inst)
				.and.calledWithExactly('a', 'b');
		});

		it('should not bind blacklisted methods', () => {
			let constructor = () => {};
			let render = () => null;
			const C = createClass({
				constructor,
				render
			});
			let c = new C();
			expect(c).to.have.property('constructor').that.equals(constructor);
			expect(c).to.have.property('render').not.with.property('__bound');
		});
	});

	describe('createElement()', () => {
		it('should be exported', () => {
			expect(React)
				.to.have.property('createElement')
				.that.is.a('function')
				.that.equals(createElement);
		});
	});

	describe('Component', () => {
		it('should be exported', () => {
			expect(React)
				.to.have.property('Component')
				.that.is.a('function')
				.that.equals(Component);
		});
	});

	describe('PropTypes', () => {
		it('should be exported', () => {
			expect(React)
				.to.have.property('PropTypes')
				.that.is.an('object')
				.that.equals(PropTypes);
		});
	});
});
