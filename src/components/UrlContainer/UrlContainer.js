import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls, error, removeUrl }) => {
  const urlEls = urls.map(url => {
    return (
      <div className="url" key={url.id}>
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button id={url.id} onClick={(e) => removeUrl(e)}>Delete</button>
      </div>
    )
  });

  return (
    <section>
      { !error && urlEls.length && urlEls }
      { !urlEls.length && !error && <p>No urls yet! Find some to shorten!</p> }
      { error && <p>{error}</p> }
    </section>
  )
}

export default UrlContainer;
