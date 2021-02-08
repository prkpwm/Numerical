import React from 'react';
import '../../App.css';
import Login from '../Secure/login';
import Menubar from '../../Component/Menubar';
import rootMom from './mom';
import TableFunction from '../../Component/TableFunction2';
import Cookies from 'universal-cookie';
import databases from '../Secure/databases';
import Chart_graph from '../../Component/chart';
const cookies = new Cookies();
let algebra = require('algebra.js');
let Equation = algebra.Equation
class onepoint extends rootMom {
  
  showAnswer = () => {
    this.onepoint(this.state.a, this.state.b, this.state.mitr,this.state.eps)
  }
  
  onepoint = (a, b, mitr,eps) => {
    let xold = a
    let epsilon= 0;
    let xnew = 0;
    let counter = 0;
    do {
      xnew = this.func(xold);
      epsilon = this.error(xnew, xold)
      this.state.items.push({ n: counter, xM: xold.toFixed(6),fxM: xnew.toFixed(6), acc: Math.abs(epsilon).toFixed(6), fn: this.func(counter) })
      counter++;
      xold = xnew;
    } while (Math.abs(epsilon) > eps && counter < mitr);
    this.setState({ items: this.state.items })
  }

  handleCheck = event => {
    if (event.target.checked) {
      this.serach(3)
    }
    this.setState({ rememberMe: event.target.checked });
  };

  handleCheckSave = (event) => {
    if (event.target.checked) {
      this.saveThis(4)
    }
    this.setState({ rememberMeSvae: event.target.checked });
  };

  render() {
    return (
      <div className="onepoint">
        {this.renderAuthen(cookies.get('username')) ?
          <table className="NavBodyImg2">
            <Menubar title="One Point Itration" />
            <div className="myfontstye NavBoxText">
              <h2 >One Point Itration method</h2>
              <p>
                Different to bracketing methods which are always convergent, the open methods can be convergent or divergent,<br /> but when they are convergent, their convergent speed is usually better than bracketing methods.    <br />            </p>
            </div>
            {/* INPUT BOX*/}
            <div class="form-group">
              <form action="" class="form-group" onSubmit={this.handleSummit}>
                <div class="col-xs-4 NavBox3">
                  <label for="ex1">Function </label>
                  <input type="text" class="form-control" id="ex1" placeholder="Ex. 3*x^2 - 2*x - 1 =0" onChange={e => { this.setState({ equ: e.target.value }) }} value={this.state.equ} />
                </div>
                <div class="form-group row ">
                  <div class="col-xs-4 NavBox2">
                  </div>
                  <div class="col-xs-4 NavBox2">
                    <label for="ex2">Start value</label>
                    <input class="form-control floatNumber" id="ex2" type="Number" onChange={e => { this.setState({ a: e.target.value }) }} value={this.state.a} />
                  </div>
                  <div class="col-xs-4 NavBox2">
                    <label for="ex3">Epsilon</label>
                    <input class="form-control floatNumber" id="ex4" type="Number" onChange={e => { this.setState({ eps: e.target.value }) }} value={this.state.eps} />
                  </div>
                  <div class="col-xs-4 NavBox2">
                    <label for="ex5">Maximum Iterations(1-100)</label>
                    <input class="form-control floatNumber" id="ex5" type="Number" onChange={e => { this.setState({ mitr: e.target.value }) }} value={this.state.mitr} />
                  </div>
                </div>
                <div class="input-group">
                  <div class="NavBox2">
                    <label for="ex6"></label>
                    <button type="submzit" class="btn btn-primary" >Excute</button>
                  </div>


                </div>
              </form>
              <div class="slice NavBox2">
                <input type="checkbox" checked={this.state.rememberMe}
                  onChange={this.handleCheck} />Auto
					      </div>
                <div class="slice NavBox2">
                <input type="checkbox" checked={this.state.rememberMeSave}
                  onChange={this.handleCheckSave} />Save
					      </div>
            </div>
            <table>
              {this.state.items == "" ? " " :
                <div class="myfontstye3">
                  <TableFunction items={this.state.items} />
                  {cookies.set('temp', 'true', { path: '/onepoint' })}
                  <Chart_graph items={this.state.items} />
                </div>
              }
            </table>
          </table>
          : <Login />}
      </div>
    );
  }
}

export default onepoint;
