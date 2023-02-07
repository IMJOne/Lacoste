import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return <img className="w-10 h-10 shrink-0 rounded-full" src={photoURL} alt={displayName} />;
}
