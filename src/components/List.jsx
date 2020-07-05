import React from 'react';
import '../App.css';

function List(props) {
  return (
    <div className="list-cont">
      {
        (props.items || []).map( item => 
          <div className="list-item" key={item.id}>
            <div className="title">
              {item.title}
            </div>
            <div className="author">
              - {item.author}
            </div>
            <div className="summary">
              {item.summary.length > 200 ? 
                item.summary.slice(0,200) + '...' : item.summary}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default List;
