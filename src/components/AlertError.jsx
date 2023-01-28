import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({isVisible,dismiss}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(isVisible)
  },[isVisible])

  if (show) {
    return (
      <Alert variant="danger" onClose={() => dismiss()} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }

}

export default AlertDismissibleExample