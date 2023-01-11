

const DocumentStatusStyle = ( status ) => {

    var color = "";

    if(status.status === "Acted")
    {
        color = "red"
    }
    else if(status.status === "active" || status.status === 'Active')
    {  
        color = "green"
    }
    else if(status.status === "Acted and Transfered")
    {
        color = "skyblue"
    }
    
    return (
        <div style={{'color':color}}>
            <strong>{status.status}</strong> 
        </div>
    )
}

export default DocumentStatusStyle