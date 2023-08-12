import React from 'react'
import MyProfileHeader from './MyProfileHeader';
import MyProfileContent from './MyProfileContent';

export default function MyProfileRoot() {

  return (
    <div className="user-profile-root">
      <MyProfileHeader>

      </MyProfileHeader>
      <MyProfileContent></MyProfileContent>
    </div>
  )
}
