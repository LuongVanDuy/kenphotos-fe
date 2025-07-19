"use client";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const File = (props: any) => {
  return (
    <>
      <h1>test</h1>
    </>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(File);
