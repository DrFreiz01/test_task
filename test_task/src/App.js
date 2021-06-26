import React from 'react';
import ReactDOM from 'react-dom';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.randomuser.me/?results=30")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      // return ("asd");

      // items.map(function(item) {
      //   if (item.registered.age > 10) {
      //     console.log("asd");
          
      //   }
      // });



      return (
        <div>
          {items.map(item => (

            {item.registered.age > 20 ? <p> asd item.registered.age</p> : "asd"}



          ))}
          </div>
      );
    }
  }
}
