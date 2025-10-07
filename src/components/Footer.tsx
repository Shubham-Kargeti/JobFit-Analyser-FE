import React from 'react';
export default function Footer() {
  return (
    <footer className="site-footer">
      &copy; {new Date().getFullYear()} JobFit Analyzer &mdash; All rights reserved.
    </footer>
  );
}
