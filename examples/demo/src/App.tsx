import { Button } from '@sharedcomp/button';
import { Card } from '@sharedcomp/card';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>SharedComp Demo</h1>
        <p>Demonstrating reusable React components from our monorepo</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>Button Component</h2>
          <div className="button-showcase">
            <div className="button-group">
              <h3>Variants</h3>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>

            <div className="button-group">
              <h3>Sizes</h3>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="button-group">
              <h3>States</h3>
              <Button>Enabled</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Card Component</h2>
          <div className="card-showcase">
            <Card
              title="Simple Card"
              description="This is a basic card with a title and description."
            />

            <Card
              title="Card with Action"
              description="This card includes an action button."
              actionButton={{
                label: "Learn More",
                onClick: () => alert("Button clicked!"),
                variant: "primary"
              }}
            />

            <Card
              title="Card with Content"
              description="This card has custom content and footer."
              footer={<span style={{ color: '#6b7280' }}>Custom footer</span>}
            >
              <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: '#374151' }}>
                  This is custom content inside the card. You can put any React elements here.
                </p>
              </div>
            </Card>

            <Card
              title="Feature Card"
              description="Showcasing the Button component used within Card"
              actionButton={{
                label: "Get Started",
                onClick: () => console.log("Getting started..."),
                variant: "outline"
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563' }}>
                <li>Automatic dependency management</li>
                <li>Version synchronization</li>
                <li>TypeScript support</li>
                <li>ESM and CJS builds</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Component Dependency</h2>
          <div className="info-box">
            <p>
              The <strong>Card</strong> component uses the <strong>Button</strong> component internally.
              When you update the Button component and bump versions, the Card component automatically
              gets the updated Button version!
            </p>
            <p>
              Try running: <code>npm run version:patch</code>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;